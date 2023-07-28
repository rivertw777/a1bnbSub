from typing import Union

from fastapi import FastAPI, UploadFile, File
import uvicorn
from starlette.middleware.cors import CORSMiddleware
from typing import List

from PIL import Image
import io
import shutil
import os
from pathlib import Path

app =FastAPI(debug=True)

origins= ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# from pymongo import MongoClient
# client =MongoClient('localhost', 27017)
# db= client.kdt

# # db.users.insert_one({'name': 'admin'}) # insert
# db.users.delete_one({'name':'admin'})

# all_users= list(db.users.find({}))
# print(all_users)

@app.get("/")
def read_root():
    return {"Hello": "World"}

# @app.get("/items/{item_id}")
# def read_item(item_id: int, q: Union[str, None] = None):
#     return {"item_id": item_id, "q": q}

# Django에서 받은 이미지 임시 저장 함수
def save_image(image : UploadFile, filename : str):
    with open(filename, "wb") as f:
        shutil.copyfileobj(image.file, f)

# django '/upload' post 요청시 호출
# 모델로 이미지를 넘겨주는 부분 
@app.post("/upload")
async def upload_images(images: List[UploadFile] = File(...)):
# async def upload_images(images: File):
    # 여기에서 이미지를 처리하는 로직을 구현합니다.
    # 예를 들면 이미지를 저장하거나 분석하는 작업 등이 가능합니다.
    os.makedirs('./images', exist_ok=True)
    saved_image_paths = []
    for image in images:
        filename= f"images/{image.filename}"
        save_image(image, filename)
        saved_image_paths.append(filename)
     
    return {"result": "success!"}

@app.post("/dl/detection")
async def detection(images: List[UploadFile] = File(...)):
    # test 용 return 값
    
    test_result= {
        "post_1" : {
                    "test1" : {
                                "Oven" : [1, 2, 3, 4, 5],
                                "TV" : [1, 2, 3, 4, 5]
					},
                    "test2" : {
                                "Refrigerator" : [1, 2, 3, 4, 5],
                                "Mircrowave" : [1, 2, 3, 4, 5]
                    },
                    "test3" : {
                                "Bed" : [1, 2, 3, 4, 5],
                                "Lamp" : [1, 2, 3, 4, 5]
                    }
        }
    }
    # return {"result": "detection success!"}
    return {"result": test_result}

@app.post("/dl/classification")
async def classification(images: List[UploadFile] = File(...)):
    # test 용 return 값
    test_result= {
         "post_1" : {
                "test1" : ["Room 1", 0.5],
				"test2" : ["Bathroom 1", 0.3],
				"test3" : ["Room 1", 0.8],
				"test4" : ["Balcony", 0.6],
				"test5" : ["Living room", 0.7],
				"test6" : ["Room 2", 0.9],
				"test7" : ["Bathroom 2", 0.8],
				"test8" : ["Others", 0.2],
         }
    }
    # return {"result": "classification success!"}
    return {"result": test_result}

@app.post("/dl/generation")
async def generation(images: List[UploadFile] = File(...)):
     # test 용 return 값
    test_result= {
         "post_1" : {
                 "test1" : "편안한 분위기의 방입니다."
         }
    }
    # return {"result": "generation success!"}
    return {"result": test_result}