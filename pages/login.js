import FormLogin from "../app/components/form-login";
import { Layout } from "antd";

const Login = () => {
  return (
      <Layout>
          <div className="content">
                  <FormLogin />
          </div>
      </Layout>
  );
};

export default Login;
