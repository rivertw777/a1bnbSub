from rest_framework import viewsets
from .models import Post, Photo, mainpage
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.core.files.storage import FileSystemStorage
import os
import requests
from django.http import JsonResponse
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny
from .serializers import PostSerializer, PhotoSerializer, mainpageSerializer

# Create your views here.
class mainpageView(viewsets.ModelViewSet):
    serializer_class= mainpageSerializer
    queryset= mainpage.objects.all()
    
# upload image view # /admin/
class uploadImageList(APIView):
    def get(self, request): # GET 
       images= mainpage.objects.all()
       
       serializer= mainpageSerializer(images, many= True)
       return Response(serializer.data)
   
    def post(self, request): # POST
       serializer= mainpageSerializer(
           data= request.data)
       
       if serializer.is_valid():
           serializer.save() 
           return Response(serializer.data, status=status.HTTP_201_CREATED)
       return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# 이미지 저장 함수 
def save_image(image):
    # 이미지 파일을 저장할 디렉토리를 지정합니다.
    upload_dir = 'images'
    # if not os.path.exists(upload_dir): # 항상 새로 시작 (이전 데이터 삭제)
    #     os.makedirs(upload_dir)

    # 이미지 파일의 확장자를 추출합니다.
    filename, ext = os.path.splitext(image.name)

    # 저장될 파일의 경로를 생성합니다.
    saved_path = os.path.join(upload_dir, f"{filename}{ext}")

    # 파일을 저장합니다.
    fs = FileSystemStorage()
    fs.save(saved_path, image)

    return saved_path
    
# /upload POST 요청 시 호출 
# 이미지를 fast-api 로 post 한다
@api_view(['post'])
def upload_images(request):
    # image data 를 media/images 폴더 안에 저장 
    # image 한 장에 대해 
    # serializer= mainpageSerializer(
    #             data= request.data, many= True)
    # if serializer.is_valid():
    #     serializer.save()
    #     return Response(serializer.data, status=status.HTTP_201_CREATED)
    # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    # image_file= request.FILES['images']
    # test= request.POST['text']
    
    serverUrl="http://127.0.0.1:9596/upload" # fast-api 테스트용 임시 url # fast-api 실행: uvicorn main:app --port 9596 --reload
    
    if request.FILES.getlist("images"):
        # fast-api post 요청 부분
        images = request.FILES.getlist("images")
        files = [('images', img) for img in images]
        response = requests.post(serverUrl, files=files)
        
        saved_image_paths = []
        
        # upload_dir = 'images'
        # if os.path.exists(upload_dir): # 항상 새로 시작 (이전 데이터 삭제)
        #     shutil.rmtree(upload_dir)
        
        for image in images:
            # 이미지를 저장하고 저장된 파일 경로를 리스트에 추가
            saved_path = save_image(image)
            saved_image_paths.append(saved_path)
        
        # fast api 각각 3번 호출 
        # detection fast api 호출 
        detecServerUrl="http://127.0.0.1:9596/dl/detection"
        result_detect= requests.post(detecServerUrl, files=files)
        # 이미지 박스 쳐서 그림
        
        # classification fast api 호출 
        classiServerUrl="http://127.0.0.1:9596/dl/classification"
        result_classi= requests.post(classiServerUrl, files=files)
        # text generation fast api 호출 
        textServerUrl="http://127.0.0.1:9596/dl/generation"
        result_text= requests.post(textServerUrl, files=files)
        
        print(result_detect.json(), result_classi.json(), result_text.json())
        return JsonResponse ({"detect_result": result_detect.json(), "classi_result": result_classi.json(), "text_result": result_text.json()})
        # return JsonResponse({'result': "success", 'saved_paths': saved_image_paths}, status=200)
        # return JsonResponse({'result': "success", 'result_detect': result_detect, 'result_classi': result_classi, 'result_text': result_text}, status=200)
    
    return JsonResponse({'result': "fail"}, status=400)

# django 에서 get/ammenities/ GET 요청 시 호출 
@api_view(['get'])
def get_ammenities(request):
    upload_dir = 'images'
    return JsonResponse({'image_file': 'image.jpg', "text": "ammenities des"})

#####################################################################################################333

class PostViewSet(ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class PostViewSet(ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [AllowAny]  # FIXME: 인증 적용

class PhotoViewSet(ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PhotoSerializer

class PhotoViewSet(ModelViewSet):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer
    permission_classes = [AllowAny]  # FIXME: 인증 적용