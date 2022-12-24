import React, { useRef, useState,useContext } from "react";

import {
    Col,
    Row,
    Container,
    Table,
    Form,
    InputGroup,
    Button,
    Modal,
    Card,
} from "react-bootstrap";
import NavBar from "./navbar";
import { Link } from "react-router-dom";

import services from "../data/services";
import { TokenContext,VotingCodeContext } from "../context/Context";
import { useMutation, useQuery } from "react-query";
import QRCode from "react-qr-code";


const QRCard = React.memo(({ item, Delete }) => {

    const {votingcode,setVotingCode} = useContext(VotingCodeContext);

    return (
        <Card style={{ width: 185 }}>
            <div
                style={{
                    height: "auto",
                    margin: "0 auto",
                    maxWidth: 180,
                    padding: 5,
                    width: "100%",
                    alignItems: "center",
                }}
            >
                <QRCode
                    size={256}
                    style={{
                        height: "auto",
                        maxWidth: "100%",
                        width: "100%",
                    }}
                    value={item ? item.votingcode+'' : "0"}
                    viewBox={`0 0 256 256`}
                />
            </div>
            <Card.Body>
                <Card.Title>{item && item.title}</Card.Title>
                <Card.Text>
                    Code: {item.votingcode} <br/>
                    King:{item.sel_king.length} Queen:{item.sel_queen.length}
                </Card.Text>

                <Link to='/selection' onClick={()=>
                    {
                        setVotingCode(item.votingcode)
                    }
                }  className="btn btn-primary  btn-block">Open</Link>
                <Button variant="danger" style={{marginLeft:10}} onClick={() => Delete(item.id)}>
                    Delete
                </Button>
            </Card.Body>
        </Card>
    );
});

const Home = () => {
    const titleRef = useRef(0);
    const dateRef = useRef(0);
    const timeRef = useRef(0);

    const [cShow, setCShow] = useState(false);
    const [sShow, setsShow] = useState(false);
    const [votingcode, setVotingCode] = useState(0);

    const [deleteShow,setDeleteShow] = useState(false);
    const v_data = useQuery(["vdata"], services.getcreateVoting);

 

    const Create = useMutation(services.createVoting, {
        onMutate: (e) => {
            console.log("Mutating");
        },
        onSuccess: (e) => {
            setVotingCode(e.data);
            setsShow(true);
            console.log(e.data);
            v_data.refetch();
        },
    });

    const Delete = useMutation(services.deletecreateVoting, {
        onMutate: (e) => {
            console.log("Mutating");
        },
        onSuccess: (e) => {
            v_data.refetch();
            alert("Successfully Delete");
        },
    });

    const [tempid,setTempId] = useState();

    const DeleteVoting = (id) => {
        setDeleteShow(true);
        setTempId(id)
       

        // console.log(dateRef.current.value, timeRef.current.value);
    };

    const CreateVoting = () => {
        Create.mutate({
            title: titleRef.current.value,
            endtime: dateRef.current.value + " " + timeRef.current.value,
        });

        setCShow(false);
        // console.log(dateRef.current.value, timeRef.current.value);
    };

    
    return (
       
        <div
            style={{
                display:'flex',
                backgroundColor: "#f0f0f0",
                minHeight: '91vh',
            }}
        >
            <Container>
            <div
                style={{
                    marginTop: 50,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Modal
                    show={cShow}
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Body>
                        <Form.Group
                            className="mb-3"
                            controlId="register-control"
                        >
                            <Form.Label>Voting Title</Form.Label>
                            <Form.Control
                                type="username"
                                className="mb-3"
                                placeholder="Voting Title"
                                required
                                ref={titleRef}
                            />
                            <Form.Label>End Date & Time</Form.Label>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}
                            >
                                <Form.Control
                                    type="date"
                                    className="mb-3"
                                    placeholder="Date"
                                    required
                                    ref={dateRef}
                                    // ref={r_name}
                                />
                                <Form.Control
                                    type="time"
                                    className="mb-3"
                                    placeholder="Voting Title"
                                    required
                                    ref={timeRef}
                                    // ref={r_name}
                                />
                            </div>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant={"danger"}
                            onClick={(e) => setCShow(false)}
                        >
                            Discard
                        </Button>
                        <Button
                            variant={"primary"}
                            onClick={CreateVoting}
                            // onClick={(e) => setModalShow(false)}
                        >
                            Create Voting
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal
                    show={sShow}
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Body>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <div
                                style={{
                                    height: "auto",
                                    margin: "0 auto",
                                    maxWidth: 130,
                                    width: "100%",
                                    alignItems: "center",
                                }}
                            >
                                <QRCode
                                    size={256}
                                    style={{
                                        height: "auto",
                                        maxWidth: "100%",
                                        width: "100%",
                                    }}
                                    value={votingcode + ""}
                                    viewBox={`0 0 256 256`}
                                />
                                <h4 style={{ textAlign: "center" }}>
                                    {votingcode}
                                </h4>
                            </div>
                            <div style={{ marginLeft: 10 }}>
                                <h4 style={{ fontFamily: "Roboto-Bold" }}>
                                    Successfully Created
                                </h4>
                                <p>
                                    You need to save your voting code and QR
                                    Code to access other people to connect our
                                    voting system.
                                </p>
                            </div>
                        </div>
                        <Modal.Footer>
                            <Button variant={"primary"}>Save QR Code</Button>
                            <Button
                                variant={"danger"}
                                onClick={() => setsShow(false)}
                            >
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal.Body>
                </Modal>
                <Modal
                    show={deleteShow}
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Body>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            
                            <div style={{ marginLeft: 10 }}>
                                <h4 style={{ fontFamily: "Roboto-Bold" }}>
                                    Are you sure want to Delete.
                                </h4>
                                <p style={{color:'black'}}>
                                    Its will delete all the datas that are belong to this votingcode.
                                </p>
                            </div>
                        </div>
                        <Modal.Footer>
                            <Button variant={"danger"} onClick={()=>{
                               Delete.mutate({
                                 id: tempid,
                                 });
                               setDeleteShow(false);
                            }}>Yes, I want to Delete.</Button>
                            <Button
                                variant={"primary"}
                                onClick={() => setDeleteShow(false)}
                            >
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal.Body>
                </Modal>

                <div className={"voting_card"}>
                    {/* {JSON.stringify(v_data)} */}
                    {v_data.data &&
                        v_data.data.data.map((item, index) => (
                            <div>
                                <QRCard item={item} key={index} Delete={DeleteVoting}  />
                            </div>
                        ))}
                    <Button  style={{minWidth: 185,minHeight: 185}} variant="primary" onClick={() => setCShow(true)}>
                        + Create New Voting
                    </Button>
                </div>
            </div>
            </Container>
        </div>
       
    );
};

export default Home;
