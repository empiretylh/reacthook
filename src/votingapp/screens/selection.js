import React, { useRef, useState, useContext, useMemo } from "react";

import {
    Col,
    Row,
    Container,
    Table,
    Form,
    InputGroup,
    ButtonGroup,
    ToggleButton,
    Button,
    Modal,
    Card,
} from "react-bootstrap";
import NavBar from "./navbar";
import { Link } from "react-router-dom";

import services from "../data/services";
import { TokenContext, VotingCodeContext } from "../context/Context";
import { useMutation, useQuery } from "react-query";
import QRCode from "react-qr-code";
import { IMAGE as I } from "../../assets/assets";

import {
    Bag,
    Boxes,
    CloudArrowUp,
    Search,
    Wallet,
    Trash,
    Images,
    Pencil,
    XCircle,
} from "react-bootstrap-icons";
import axios from "axios";
import ImageUpload from "./ImageUpload";
const QRCard = React.memo(({ item, Ondelete,onImageOpen }) => {
    const [deleteShow, setDeleteShow] = useState(false);
   
    return (
        <Card style={{ width: 185 }}>
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
                            <p style={{ color: "black" }}>
                                Its will delete all the datas that are belong
                                to.
                            </p>
                        </div>
                    </div>
                    <Modal.Footer>
                        <Button
                            variant={"danger"}
                            onClick={() => {
                                setDeleteShow(false);
                                Ondelete(item);
                            }}
                        >
                            Yes, I want to Delete.
                        </Button>
                        <Button
                            variant={"primary"}
                            onClick={() => setDeleteShow(false)}
                        >
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal.Body>
            </Modal>
            <img
                src={axios.defaults.baseURL + item.profileimage}
                alt={item.name}
                className="profileLarge"
            />

            <Card.Body>
              <img
                        src={item.is_male
                         ? I.king : I.queen}
                        alt="king crown"
                        style={{
                            position:'absolute',top:5,left:5,
                            width: 30,
                            height: 30,
        
                        }}
                    />
                <Card.Title>
                    
                    {item && item.name}
                </Card.Title>
                <Card.Text>{item.year}</Card.Text>
                <ButtonGroup style={{ display: "flex", right: 0 }}>
                    <Button
                        variant="primary"
                        onClick={() => {
                        onImageOpen(item);
                        }}
                        style={{ alignItems: "center" }}
                    >
                        <Images /> {item.images.length}
                    </Button>
                    <Button
                        variant="outline-warning"
                        onClick={() => {
                            // setDeleteShow(true);
                            // Ondelete(item);
                        }}
                    >
                        <Pencil size={20} />
                    </Button>
                    <Button
                        variant="outline-danger"
                        onClick={() => {
                            setDeleteShow(true);
                            // Ondelete(item);
                        }}
                    >
                        <Trash size={20} />
                    </Button>
                </ButtonGroup>
            </Card.Body>
        </Card>
    );
});

const Selection = () => {
    const titleRef = useRef(0);
    const dateRef = useRef(0);
    const timeRef = useRef(0);

    const { votingcode, setVotingCode } = useContext(VotingCodeContext);

    const [radioValue, setRadioValue] = useState("All");

    const [Sel_Item,SetSel_Item] = useState();
    const [imgshow, setImgShow] = useState(false);

   const onImageOpen = (item)=>{
    setImgShow(true);
    SetSel_Item(item)
   }

    const onImageHide = () => {
        setImgShow(false);
    };

    const [whoS, setWhoS] = useState(0);
    const [akShow, setAkShow] = useState(false);

    const nameRef = useRef(0);
    const yearRef = useRef(0);
    const fbRef = useRef(0);
    const igRef = useRef(0);
    const pfRef = useRef(0);

    const radios = [
        { name: "All", value: "All" },
        { name: "King", value: "Home" },
        { name: "Queen", value: "Queen" },
    ];

    const all_data = useQuery(["voting_data", votingcode], services.getVoting);

    const createKing = useMutation(services.addKing, {
        onMutate: () => {},
        onSuccess: () => {
            all_data.refetch();
        },
    });

    const createQueen = useMutation(services.addQueen, {
        onMutate: () => {},
        onSuccess: () => {
            all_data.refetch();
        },
    });

    const deleteKing = useMutation(services.deleteKing, {
        onMutate: () => {},
        onSuccess: () => {
            all_data.refetch();
        },
    });

    const deleteQueen = useMutation(services.deleteQueen, {
        onMutate: () => {},
        onSuccess: () => {
            all_data.refetch();
        },
    });

    const DeletePeople = (item) => {
        console.log("Deleteing Peopleing......");
        if (item.is_male) {
            deleteKing.mutate({
                id: item.id,
                votingcode: votingcode,
            });
        } else {
            deleteQueen.mutate({
                id: item.id,
                votingcode: votingcode,
            });
        }
    };

    const display_data = useMemo(() => {
        if (all_data.data) {
            const d = all_data.data.data;
            const sel_king = d.sel_king;
            const sel_queen = d.sel_queen;

            const all = sel_king.concat(sel_queen);

            return all;
        }
        return {};
    }, [all_data.data]);

    return (
        <div
            style={{
                display: "flex",
                backgroundColor: "#f0f0f0",
                minHeight: "100vh",
            }}
        >

            {imgshow&&<ImageUpload show={imgshow} onHide={onImageHide} item={Sel_Item}  />}
            <Modal
                show={akShow}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <Modal.Title>
                        <img
                            src={whoS === "king" ? I.king : I.queen}
                            alt="king crown"
                            style={{
                                width: 25,
                                height: 25,
                                marginRight: 5,
                                marginTop: -2,
                            }}
                        />

                        {whoS === "king"
                            ? "Add King Selection"
                            : "Add Queen Selection"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="register-control">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            className="mb-3"
                            placeholder="Name"
                            required
                            ref={nameRef}
                            // ref={titleRef}
                        />
                        <Form.Label>Years and Semester</Form.Label>

                        <Form.Control
                            type="text"
                            className="mb-3"
                            placeholder="Eg: 1CST"
                            required
                            // ref={dateRef}
                            // ref={r_name}
                            ref={yearRef}
                        />
                        <Form.Label>Facebook Profile Link</Form.Label>

                        <Form.Control
                            type="text"
                            className="mb-3"
                            placeholder="https://www.facebook.com/xxxxxxxxxxxx.xxxxx"
                            required
                            // ref={dateRef}
                            // ref={r_name}
                            ref={fbRef}
                        />
                        <Form.Label>Instagram Username</Form.Label>

                        <Form.Control
                            type="text"
                            className="mb-3"
                            placeholder="eg: thuralinhtut__"
                            required
                            // ref={dateRef}
                            // ref={r_name}
                            ref={igRef}
                        />

                        <Form.Label>Profile </Form.Label>

                        <Form.Control
                            type="file"
                            className="mb-3"
                            placeholder="Choose Image File"
                            required
                            // ref={dateRef}
                            // ref={r_name}
                            ref={pfRef}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={"danger"} onClick={() => setAkShow(false)}>
                        Discard
                    </Button>
                    <Button
                        type="submit"
                        variant={"primary"}
                        onClick={(e) => {
                            setAkShow(false);
                            if (whoS === "king") {
                                createKing.mutate({
                                    name: nameRef.current.value,
                                    year: yearRef.current.value,
                                    fblink: fbRef.current.value,
                                    iglink: igRef.current.value,
                                    profileimage: pfRef.current.files[0],
                                    votingcode: votingcode,
                                });
                            } else if (whoS === "queen") {
                                createQueen.mutate({
                                    name: nameRef.current.value,
                                    year: yearRef.current.value,
                                    fblink: fbRef.current.value,
                                    iglink: igRef.current.value,
                                    profileimage: pfRef.current.files[0],
                                    votingcode: votingcode,
                                });
                            }
                        }}
                        // onClick={(e) => setModalShow(false)}
                    >
                        Add {whoS === "king" ? "King" : "Queen"}
                    </Button>
                </Modal.Footer>
            </Modal>
            <Container style={{ marginTop: 10 }}>
                <h3>Create Selection</h3>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    <ButtonGroup>
                        {radios.map((radio, idx) => (
                            <ToggleButton
                                key={idx}
                                id={`radio-${idx}`}
                                type="radio"
                                variant={"outline-dark"}
                                name="radio"
                                value={radio.value}
                                checked={radioValue === radio.value}
                                onChange={(e) =>
                                    setRadioValue(e.currentTarget.value)
                                }
                            >
                                {radio.name}
                            </ToggleButton>
                        ))}
                    </ButtonGroup>
                    <div>
                        <ButtonGroup>
                            <Button
                                variant="outline-dark"
                                style={{ alignItems: "center" }}
                                onClick={() => {
                                    setWhoS("king");
                                    setAkShow(true);
                                }}
                            >
                                <img
                                    src={I.king}
                                    alt="king crown"
                                    style={{
                                        width: 25,
                                        height: 25,
                                        marginRight: 5,
                                        marginTop: -2,
                                    }}
                                />
                                Add King
                            </Button>
                            <Button
                                variant="outline-dark"
                                style={{ alignItems: "center" }}
                                onClick={() => {
                                    setWhoS("queen");
                                    setAkShow(true);
                                }}
                            >
                                <img
                                    src={I.queen}
                                    alt="king crown"
                                    style={{
                                        width: 25,
                                        height: 25,
                                        marginRight: 5,
                                        marginTop: -2,
                                    }}
                                />
                                Add Queen
                            </Button>
                        </ButtonGroup>
                    </div>
                </div>
                <div className={"profile_card"} style={{ marginTop: 50 }}>
                    {/* {JSON.stringify(all_data.data)} */}
                    {all_data.data &&
                        display_data.map((item, index) => (
                            <QRCard item={item} Ondelete={DeletePeople} onImageOpen={onImageOpen} />
                        ))}
                </div>
            </Container>
        </div>
    );
};

export default Selection;
