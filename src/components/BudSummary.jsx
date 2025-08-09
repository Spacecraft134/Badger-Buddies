import { useState } from "react";
import { Button, Card, Container, Carousel } from "react-bootstrap";

const BudSummary = ({ bud, save }) => {
    const [show, setShow] = useState("Show More");
    const [showCarousel, setShowCarousel] = useState(false);

    const buttonChange = () => {
        setShow(show === "Show More" ? "Show Less" : "Show More");
        setShowCarousel(!showCarousel);
    };

    const description = bud.description ? bud.description : "No description available";

    return (
        <Card className="text-center shadow-sm">
            <Card.Body>
                <div>
                    {showCarousel ? (
                        <Carousel data-bs-theme="dark">
                            {bud.imgIds.map((imgId, index) => (
                                <Carousel.Item key={index}>
                                    <img
                                        src={`https://raw.githubusercontent.com/CS571-S25/hw5-api-static-content/main/cats/${imgId}`}
                                        alt={`A picture of ${bud.name} ${index + 1}`}
                                        style={{ height: "250px", width:"100%", aspectRatio: "1 / 1", objectFit: "cover" }}
                                    />
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    ) : (
                        <Card.Img
                            variant="top"
                            src={`https://raw.githubusercontent.com/CS571-S25/hw5-api-static-content/main/cats/${bud.imgIds[0]}`}
                            alt={`A picture of ${bud.name}`}
                            style={{ height: "250px", width: "100%", aspectRatio: "1 / 1", objectFit: "cover" }}
                        />
                    )}
                     <h1>{bud.name}</h1>
                    {show === "Show Less" && (
                        <div>
                            <p><strong>Gender</strong>: {bud.gender}</p>
                            <p><strong>Breed</strong>: {bud.breed}</p>
                            <p><strong>Age</strong>: {bud.age}</p>
                            <p><strong>Description</strong>: {description}</p>
                        </div>
                    )}
                    <Container>
                        <Button variant="primary" onClick={buttonChange}>{show}</Button>
                        {save && (
                            <Button variant="secondary" className="ms-2" onClick={() => save(bud.id, bud.name)}>Save</Button>
                        )}
                    </Container>
                </div>
            </Card.Body>
        </Card>
    );
};

export default BudSummary;
