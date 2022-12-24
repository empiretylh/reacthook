import React from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
const Navbar = () => {
	return (
		<div className="navbar">
			<Container style={{flex:1,flexDirection: 'row',alignItems: 'center',  }}>

			<h4>Logo</h4>
			<div style={{ display: "flex", flexDirection: "row" }}><Link to="/developer" className={"link"}>
					Download
				</Link>
				<Link to="/developer" className={"link"}>
					Developer
				</Link>
				<Link to="/about" className={"link"}>
					About
				</Link>
				<a href="https://www.ucsdawei.edu.mm/" className={"link"}>
					UCSD
				</a>
			</div>
			</Container>
		</div>
	);
};

export default React.memo(Navbar);
