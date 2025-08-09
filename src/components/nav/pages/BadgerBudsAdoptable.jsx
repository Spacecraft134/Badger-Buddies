import { useContext, useEffect, useState } from "react";
import BadgerBudsDataContext from "../../../contexts/BadgerBudsDataContext";
import BudSummary from "../../BudSummary";
import { Container, Row, Col } from "react-bootstrap";

export default function BadgerBudsAdoptable(props) {
    const allCats = useContext(BadgerBudsDataContext);
    const [cats, setCats] = useState([]);

    useEffect(() => {
        if (allCats.length > 0) {
            const savedCatIds = JSON.parse(sessionStorage.getItem("savedCatIds")) || [];
            const adoptedCatIds = JSON.parse(sessionStorage.getItem("adoptedCatIds")) || [];
            const filteredCats = allCats.filter(cat => !savedCatIds.includes(cat.id) && !adoptedCatIds.includes(cat.id));
            setCats(filteredCats);
        }
    }, [allCats]);

    const handleSaveCat = (id, name) => {
        alert(`${name} has been added to your basket!`);
        const savedCatIds = JSON.parse(sessionStorage.getItem("savedCatIds")) || [];
        savedCatIds.push(id);
        sessionStorage.setItem("savedCatIds", JSON.stringify(savedCatIds));
        setCats(prev => prev.filter(cat => cat.id !== id));
    };

    return (
        <div>
            <h1>Available Badger Buds</h1>
            <p>The following cats are looking for a loving home! Could you help?</p>
            <Container>
                <Row className="px-2">
                    {cats.length > 0 ? (
                        cats.map((cat) => (
                            <Col key={cat.id} xs={12} sm={6} md={4} lg={3}>
                                <BudSummary bud={cat} save={handleSaveCat} />
                            </Col>
                        ))
                    ) : (
                        <Col><p>No buds are available for adoption!</p></Col>
                    )}
                </Row>
            </Container>
        </div>
    );
}
