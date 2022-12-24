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

const ImageUpload = ({ onHide, show, item }) => {



    const data = useQuery(['image',item.id,],item.is_male?services.getKingImage:services.getQueenImage)



    return (
        <Modal
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title>
                    <h3>Image Upload</h3>
                    <h3>{item.name}</h3>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                
                {data.isFetching&& <img src={I.loading} alt={'load'} style={{width:50,height:50,tintColor: '#000000'}}/>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"success"} onClick={() => onHide()}>
                    Discard
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ImageUpload;
