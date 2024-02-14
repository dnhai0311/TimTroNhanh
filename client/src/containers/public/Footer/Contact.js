import React from 'react';
import ContactItem from '../../../components/ContactItem';
import { Container, Row } from 'react-bootstrap';
import './Footer.scss';

const Contact = () => {
    return (
        <>
            <Container className="w-100  text-center rounded contact">
                <Row>
                    <h4 className="pt-4 pb-1 text-primary">Liên hệ với chúng tôi nếu bạn cần hỗ trợ</h4>
                </Row>
                <Row>
                    <h5 className="pb-1">
                        Đội chăm sóc khách hàng TIMTRONHANH.COM. Chúng tôi muốn lắng nghe câu hỏi và ý kiến đóng góp từ
                        bạn.
                    </h5>
                </Row>
                <Container>
                    <Row>
                        <ContactItem type={'Hỗ trợ đăng tin'} name={'Dương Ngọc Hải'} phone={'0868242343'} />
                        <ContactItem type={'Hỗ trợ thanh toán'} name={'Dương Ngọc Hải'} phone={'0868242343'} />
                        <ContactItem type={'Phản ánh/ khiếu nại'} name={'Dương Ngọc Hải'} phone={'0868242343'} />
                    </Row>
                </Container>
            </Container>
        </>
    );
};

export default Contact;
