import Button from 'react-bootstrap/Button';
import React, { Component, useState } from 'react';
import axios from 'axios';
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useLocation } from "react-router-dom";

// 숙소 어매니티 화면 // object detection result
// detection 결과 보여주는 함수 
const getDetectImg= ()=> {
    // return previewImg.map((el, index) =>{ # 반복 
    return (
        <div>
            <p style={{textAlign:'center'}}>숙소 어매니티 확인 부분입니다.</p>
            <Row sx= {1} md ={2} className ="g-2">
            {Array.from({ length: 10 }).map((_, idx) => (
            <Col key= {idx}>
                <Card style={{ width: '40rem' }}>
                    <Card.Img variant="top" src="https://tensorflow.org/images/bedroom_hrnet_tutorial.jpg" />
                    <Card.Body>
                        <Card.Title>detect 이미지 {idx+1}</Card.Title>
                        <textarea name="detection" rows={4} cols={60}
                        defaultValue="detection 결과를 출력합니다"/>
                    </Card.Body>
                </Card>
            </Col>
            ))}
            </Row>
            <hr/>
        </div>
    )
};
// classification 결과 보여주는 함수 
const getClassiImg= ()=> {
    return (
        <div>
            <p style={{textAlign:'center'}}>숙소 분류 확인 부분입니다.</p>
            <Row sx= {1} md ={2} className ="g-2">
            {Array.from({ length: 10 }).map((_, idx) => (
            <Col key= {idx}>
                <Card style={{ width: '40rem' }}>
                    <Card.Img variant="top" src="https://tensorflow.org/images/bedroom_hrnet_tutorial.jpg" />
                    <Card.Body>
                        <Card.Title>classification 이미지 {idx+1}</Card.Title>
                        <textarea name="classification" rows={4} cols={60}
                        defaultValue="classification 결과를 출력합니다"/>
                    </Card.Body>
                </Card>
            </Col>
            ))}
            </Row>
            <hr/>
        </div>
    )
};
// generation 결과 보여주는 함수 
const getGenerateText= ()=> {
    return (
        <div>
            <p style={{textAlign:'center'}}>숙소 소개글 확인 부분입니다.</p>
            <center>
                <label>
                    <textarea name="text_generation" rows={4} cols={40}
                    defaultValue="text generation 결과를 출력합니다" // detection 결과 
                    />
                </label>
            </center>
            <hr/>
        </div>
    )
};
// class Ammenities extends Component{
//     state ={
//         post: []
//     };
//     reqData= JSON.stringify({
//         'image_file': 'image.jpg',
//         "text": "ammenities des"
//     });

//     serverUrl= 'http://127.0.0.1:8000/get/ammenities/';
//     async componentDidMount(){
//         try{
//             const res= await fetch(this.serverUrl, {
//                 method: "GET",
//                 headers: {
//                     "Content-Type": "application/json",
//                   },
//                 // data: this.reqData
//             });
//             // console.log(this.reqData);    
//             const posts= await res.json();
//             this.setState({
//                 posts
//             });
//             console.log(posts);     
//         } catch (e){
//             console.log(e)
//         }
//     };
//     render(){
//         return (
//             <div>
//                 {/* {onLoading} */}
//                 <h1 style={{textAlign:'center'}}>호스트 숙소 게시글 화면</h1>
//                 <p style={{textAlign:'center'}}>
//                     숙소 등록하는 화면입니다
//                 </p>
//                 {/* <p style={{textAlign:'center'}}>숙소 어메니티 확인 화면입니다.</p> */}
//                 <Button variant="primary" type="submit" href="/become-host">이전</Button>
//                 <Button variant="primary" type="submit" href="">완료</Button>
//                 {/* detecion 결과 화면 보기 */}
//                 {getDetectImg()}
//                 {getClassiImg()}
//                 {getGenerateText()}
//             </div>
//         );
//     }
// }
  
// export default Ammenities;

const Ammenities = () => {
    const location = useLocation();
    const test= location.state.value;
    console.log(test['detect_result'])
    return (
        <div>
            {/* {onLoading} */}
            <h1 style={{textAlign:'center'}}>호스트 숙소 게시글 화면</h1>
            <p style={{textAlign:'center'}}>
                숙소 등록하는 화면입니다
            </p>
            {/* <p style={{textAlign:'center'}}>숙소 어메니티 확인 화면입니다.</p> */}
            <Button variant="primary" type="submit" href="/become-host">이전</Button>
            <Button variant="primary" type="submit" href="">완료</Button>
            {/* detecion 결과 화면 보기 */}
            {getDetectImg()}
            {getClassiImg()}
            {getGenerateText()}
            </div>
    );
}
export default Ammenities;