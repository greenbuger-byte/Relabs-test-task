import { useState } from "react";
import { Button, Card, Form, Input, Typography } from "antd";
import { useRouter } from "next/router";
import { UserOutlined } from "@ant-design/icons";

import auth from "../../utils/auth";
import { ROUTES } from "../../utils/constants";

import styles from './form-login.module.scss';

const FormLogin = () => {
    const [formIsLoading, setFormIsLoading] = useState(false);
    const router = useRouter();

    const onSubmit = (data) => {
        setFormIsLoading(true);
        auth.setAuth({...data, password: data.password.replace(/\s/g)}).then( () => {
            router.replace(ROUTES.main);
        }).finally(() => {
            setFormIsLoading(false)
        });
    }

    const fieldEmailRules = [
        {
            required: true,
            message:'Email должен быть заполнен'
        },
        {
            type: 'email',
            message: 'Email должен быть валидный'
        }];
    const fieldPasswordRules = [
        {
            required: true,
            message:'Пароль должен быть заполнен'
        },
        {
            min: 8,
            message: 'Минимум 8 символов'
        },
        {
            pattern: /[A-ZА-ЯЁЙ]/g,
            message: 'Минимум одна заглавная буква'
        }];

    return (
        <Card className={styles.login}>
            <Typography.Title level={1}>Войти</Typography.Title>
            <Form
                layout="vertical"
                onFinish={onSubmit}
                autoComplete="off"
            >
               <div className={styles.login__icon}> <UserOutlined style={{fontSize: '100px'}}/></div>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={fieldEmailRules}
                >
                    <Input size="large" />
                </Form.Item>
                <Form.Item
                    label="Пароль"
                    name="password"
                    rules={fieldPasswordRules}
                    hasFeedback
                >
                    <Input.Password size="large"/>
                </Form.Item>
                <Button
                    className="buttonPrimary"
                    type="primary"
                    htmlType="submit"
                    block
                    size="large"
                    loading={formIsLoading}
                >
                    Войти
                </Button>
            </Form>
        </Card>
    );
};

export default FormLogin;