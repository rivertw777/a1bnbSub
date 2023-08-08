import Button from 'react-bootstrap/Button';
import React, { Component, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useLocation, useNavigate } from "react-router-dom";

import { back_ip_port } from './back_ip_port'

const serverUrl = `${back_ip_port}user/regist/result`;

const othersImageView = (roomInfo) => {
    // list로 만들어서 출력한다? ㄴㄴ
    // 리빙룸1
    // 사진 사이즈로 열거 (브라우저 넓이 / 사진갯수로 줄여서)
    // 어메니티 출력
    let showRoomsByClassification = JSON.stringify(roomInfo);
    showRoomsByClassification = JSON.parse(showRoomsByClassification);
    // Object.values(showRoomsByClassification).map
    return (
      <div>
        
        {Object.entries(showRoomsByClassification).map(([classifiedRoomType, roomData]) => (
          
          <div>
            <div></div>
            <div>
              <h3>{classifiedRoomType}</h3>
              {/* <p>{roomData.img_path}</p> */}
              {/* <p>{imageView(roomData.img_path)}</p> */}
              <p>{Object.entries(roomData.list_amenities).map(([options, count])=> (
              // <div><img src = {path}/></div>
              <p>{options}{count}</p>
              ))}</p>
              <p>{Object.entries(roomData.img_paths).map(([options, count])=> (
              // <div><img src = {path}/></div>
              <p>{options}{count}</p>
              ))}</p>
            </div>
            <div></div>
            
          </div>
        ))}
      </div>
    );
  };
const base64ToBlob = (base64String, contentType = 'image/jpeg') => {
  const byteCharacters = window.atob(base64String);
  const byteArrays = [];
  
  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);
    
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }
  
  return new Blob(byteArrays, { type: contentType });
};
const ImageComponent = ({ base64Image }) => {
  const blob = base64ToBlob(base64Image);
  const blobURL = URL.createObjectURL(blob);

  return (
    <div>
      <img src={blobURL} alt="Image" />
    </div>
  );
};

const Ammenities = () => {
    // /become-host 에서 navigate 으로 데이터 전달 받음
    const location = useLocation();
    const navigate = useNavigate();

    const result_detection= location.state.result_detection;
    const result_classification= location.state.result_classification;
    const result_textgeneration= location.state.result_textgeneration;
    const bbox_result = location.state.result_bboxing;

    console.log(bbox_result)

    const [data, setData] = useState([]);
    const ref_title = useRef(null);
    const ref_caption = useRef(null);
    // const base64Image = base64ToBlob(bbox_result);

    const mergeData = {result_detection, result_classification}
    
    console.log(mergeData)
    //
    // POST 요청
    useEffect(() => {
      // 서버에 GET 요청 보내기
      axios.post(serverUrl, mergeData)
        .then((response) => {
          // data 설정
          setData(response.data)
          console.log(response.data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }, []);
    //
    function title_value(){
      const title = ref_title.current.value;
      return title
    };
    function caption_value(){
      const caption = ref_caption.current.value
      return caption
    };
    const regist_complete = () => {
      let title_result = title_value()
      let caption_result = caption_value()
      console.log(title_result)
      console.log(caption_result)
      navigate("/user/regist/uploaded", { state: { result_detection: result_detection, result_classification: result_classification, 
        post_title: title_result, post_caption: caption_result } })
    };
    return (
        <div>
            
            <h1 style={{textAlign:'center'}}>등록 전에 결과를 확인하세요.</h1>
            {/* <img src={`data:image/JPG;base64,${base64Image}`} /> */}
            {/* {render(base64Image)} */}
            <ImageComponent base64Image={bbox_result[0]} />
            <ImageComponent base64Image={bbox_result[1]} />
            
            {Object.entries(data).map(([item, value]) => (
            <div>
              {othersImageView(value)}
            </div>
            ))}
            <div align="center">
              <p><textarea id="area_title" ref={ref_title} placeholder="제목을 입력하세요" rows="1" cols="80" style={{resize:'none'}}></textarea></p>
              <p><textarea id="area_caption" ref={ref_caption} rows="10" cols="80" style={{resize:'none'}}>
                {result_textgeneration}
              </textarea></p>
              {/* detecion 결과 화면 보기 */}
              {/* {getDetectImg(detection_result)} */}
              {/* classification 결과 화면 보기 */}
              {/* {getClassiImg(classification_result)} */}
              {/* textgeneration 결과 화면 보기 */}
              {/* {getGenerateText(textgeneration_result)} */}
              {/* {navigate("/user/regist/uploaded", { state: { result_detection: result_detection, result_classification: result_classification, 
                post_title: text_result, post_caption: caption_result } })} */}
              <p>
                <Button variant="primary" type="submit" href="/user/regist">이전</Button>
                {/* <Button variant="primary" type="submit" href="/user/regist/uploaded">완료</Button> */}
                <Button variant="primary" type="submit" onClick={() => regist_complete()}>완료</Button>
              </p>
            </div>
        </div>
    );
}
export default Ammenities;
