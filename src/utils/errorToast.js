import React from 'react';
import { notification } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';

const showEerrorToast = (message) => {
    notification.open({
        message: 'Ошибка',
        description: message,
        icon: <ExclamationCircleFilled style={{ color: '#EE0000' }} />
    });
};

export default showEerrorToast;
