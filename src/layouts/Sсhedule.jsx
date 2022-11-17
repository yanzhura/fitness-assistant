import React, { useState } from 'react';
import { Button, Calendar, Col, Row, Divider, Statistic } from 'antd';
import { LeftOutlined, CarryOutOutlined, RightOutlined } from '@ant-design/icons';
import moment from 'moment';
import 'moment/locale/ru';
moment.locale('ru');

const Sсhedule = () => {
    const [date, setDate] = useState(moment());
    const handleClick = (action) => {
        switch (action) {
            case 'minus':
                setDate((oldDate) => moment(oldDate).subtract(1, 'month'));
                break;
            case 'plus':
                setDate((oldDate) => moment(oldDate).add(1, 'month'));
                break;
            case 'now':
                setDate(moment());
                break;
            default:
                break;
        }
    };

    const handleSelect = (selectedDate) => {
        setDate(selectedDate);
    };

    return (
        <>
            <h3>Расписание и планировщик</h3>
            <div>
                <Row justify={'center'}>
                    <Col span={16}>
                        <Calendar
                            headerRender={() => (
                                <Row justify={'center'}>
                                    <Col>
                                        <Statistic value={date.format('DD MMMM YYYY')} />
                                        <Button onClick={() => handleClick('minus')}>
                                            <LeftOutlined />
                                        </Button>
                                        <Divider type="vertical" />
                                        <Button onClick={() => handleClick('now')}>
                                            <CarryOutOutlined />
                                        </Button>
                                        <Divider type="vertical" />
                                        <Button onClick={() => handleClick('plus')}>
                                            <RightOutlined />
                                        </Button>
                                    </Col>
                                </Row>
                            )}
                            dateCellRender={(value) => {
                                if (moment('2022-11-17').isSame(value.format('YYYY-MM-DD'))) {
                                    return 'XXX';
                                }
                            }}
                            value={date}
                            onSelect={(selected) => handleSelect(selected)}
                        />
                    </Col>
                    <Col span={4}>
                        <div>Тренировки не запланированы</div>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default Sсhedule;
