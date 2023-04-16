import { notification } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import { ReactElement } from 'react';

notification.config({
    duration: 2.5,
    maxCount: 3,
    placement: "topRight"
});

export const showNotification = (type: any, title: string, description: string, style: any, icon: any) => {
    notification["success"]({
        message: title,
        description: description,
        className: 'custom-class',
        style: style ? style : null,
        icon: icon ? <SmileOutlined style={{ color: '#108ee9' }} /> : null,
    });
};