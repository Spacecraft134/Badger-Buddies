import { useContext, useEffect, useState } from "react";
import BadgerBudsDataContext from "../../../contexts/BadgerBudsDataContext";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

export default function BadgerBudsBasket() {
    const allCats = useContext(BadgerBudsDataContext);
    const [savedCats, setSavedCats] = useState([]);

    useEffect(() => {
        const savedCatIds = JSON.parse(sessionStorage.getItem("savedCatIds")) || [];
        const adoptedCatIds = JSON.parse(sessionStorage.getItem('adoptedCatIds')) || [];

        const filteredCats = allCats.filter(cat => savedCatIds.includes(cat.id) && !adoptedCatIds.includes(cat.id));
        setSavedCats(filteredCats);
    }, [allCats]);

    const handleUnselect = (id, name) => {
        alert(`${name} has been removed from your basket!`);
        const savedCatIds = JSON.parse(sessionStorage.getItem("savedCatIds")) || [];
        const updatedCatIds = savedCatIds.filter(catId => catId !== id);
        sessionStorage.setItem("savedCatIds", JSON.stringify(updatedCatIds));
        setSavedCats(prev => prev.filter(cat => cat.id !== id));
    };

    const handleAdopt = (id, name) => {
        alert(`${name} has been adopted!`);
        const savedCatIds = JSON.parse(sessionStorage.getItem("savedCatIds")) || [];
        const updatedCatIds = savedCatIds.filter(catId => catId !== id);
        sessionStorage.setItem("savedCatIds", JSON.stringify(updatedCatIds));

        const adoptedCatIds = JSON.parse(sessionStorage.getItem("adoptedCatIds")) || [];
        adoptedCatIds.push(id);
        sessionStorage.setItem("adoptedCatIds", JSON.stringify(adoptedCatIds));

        setSavedCats(prev => prev.filter(cat => cat.id !== id));
    };

    return (
        <div>
            <h1>Badger Buds Basket</h1>
            <p>These cute cats could be all yours!</p>
            <Container>
                <Row>
                    {savedCats.length > 0 ? (
                        savedCats.map((cat) => (
                            <Col key={cat.id} xs={12} sm={6} md={4} lg={3}>
                                <Card className="text-center shadow-sm">
                                    <Card.Img
                                        variant="top"
                                        src={`https://raw.githubusercontent.com/CS571-S25/hw5-api-static-content/main/cats/${cat.imgIds[0]}`}
                                        alt={`A picture of ${cat.name}`}
                                        style={{ height: "250px", objectFit: "cover" }}
                                    />
                                    <Card.Body>
                                        <h2>{cat.name}</h2>
                                        <Button variant="danger" onClick={() => handleUnselect(cat.id, cat.name)}>Unselect</Button>
                                        <Button variant="success" className="ms-2" onClick={() => handleAdopt(cat.id, cat.name)}>Adopt</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <p>You have no buds in your basket!</p>
                    )}
                </Row>
            </Container>
        </div>
    );
}
