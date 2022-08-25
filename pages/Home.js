import { queryAllByPlaceholderText } from "@testing-library/react"
import { useEffect, useState } from "react"
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap"
import { useSelector } from "react-redux"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import Apis, { endpoints } from "../configs/Apis"
import '../App.css'
import Slider1 from '../image/Slider_1.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleUp } from "@fortawesome/free-solid-svg-icons"

function Home() {
    const [tours, setTours] = useState([])
    const [goToTop, setGoToTop] = useState(false)
    const [q] = useSearchParams()
    const navigate = useNavigate()
    const user = useSelector(state => state.user.user)
    const infoCustomer = useSelector(state => state.infoCustomer.infoCustomer)

    //Lay tham so 'loai-tour', 'ten-tour' tren URL
    let loaiTourID = q.get('loai-tour')
    let tourName = q.get('ten-tour')
    let lengthTour = q.get('length')
    let fromPrice = q.get('from-price')
    let toPrice = q.get('to-price')
    let extraData = q.get('extraData')
    //Lay tham so 'loai' tren URL

    useEffect(() => {
        const loadTours = async () => {
            let res = await Apis.get(endpoints.tours)

            if (loaiTourID != null) {
                res.data = res.data.filter(tour => {
                    return tour.loai_tour == loaiTourID
                })
            }
            if(tourName) {
                res.data = res.data.filter(tour => {
                    return tour.ten_tour.toLowerCase().includes(tourName.toLowerCase())
                })
            }
            if(lengthTour) {
                res.data = res.data.filter(tour => {
                    return tour.thoi_gian == lengthTour
                })
            }
            if(fromPrice) {
                res.data = res.data.filter(tour => {
                    return tour.don_gia >= fromPrice
                })
            }
            if(toPrice) {
                res.data = res.data.filter(tour => {
                    return tour.don_gia <= toPrice
                })
            }
            if(extraData) {
                console.log(extraData);
                
                console.log(user.username);
            }
            setTours(res.data)
        }
        loadTours()
    }, [q])

    console.log(infoCustomer.name);

    useEffect(() => {
        window.scrollTo({
            top: 0, 
            behavior: 'smooth'
        });

        const handleScroll = () => {
            if(window.scrollY >= 400) {
                setGoToTop(true)
            } else {
                setGoToTop(false)
            }
        }
        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const handleScroll = () => {
        setGoToTop(false)
        window.scrollTo({
            top: 0, 
            behavior: 'smooth'
        });
    }

    const detailTour = (tourID) => {
        navigate(`/tours/${tourID}/`)
    }

    const datTourPage = (tourID) => {
        if(user != null && user != undefined) {
            navigate(`/tours/${tourID}/booking/`)
        } else {
            alert('Bạn chưa đăng nhập! Vui lòng đăng nhập để đặt vé')
        }
    }

    return (
        <>
            <Image src={Slider1} className='slider_1__home' />
            <Container>
                <h3 style={{margin: '40px 0'}}>Khám Phá Các Tour Du Lịch</h3>
                <Row>
                    {tours.map((tour) => {
                        return <Col key={tour.id} md={3} xs={12}>
                            <Card className='card_wrap__home'> 
                                <Link to={`/tours/${tour.id}/`} style={{overflow: 'hidden'}}>
                                    <Card.Img variant="top" src={tour.hinh_anh} className='img_card__home' />
                                </Link>
                                <Card.Body>
                                    <Card.Title>{tour.ten_tour}</Card.Title>
                                    <Card.Text>
                                        Ngày khởi hành: {new Date(tour.ngay_bat_dau).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                                    </Card.Text>
                                    <Card.Text>
                                        Thời gian: {tour.thoi_gian} ngày
                                    </Card.Text>
                                    <Button onClick={() => detailTour(tour.id)}>Xem chi tiết</Button>
                                    <Button style={{marginLeft: '60px'}} onClick={() => datTourPage(tour.id)} className="btn-danger">Đặt ngay</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    })}
                </Row> 
            </Container>

            {goToTop && (
                <div onClick={handleScroll} className='btn_go_to_top'>
                    <FontAwesomeIcon icon={faAngleUp} />
                </div>
            )}
        </>
    )
}

export default Home