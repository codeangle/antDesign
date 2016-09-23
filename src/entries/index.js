import './index.html';
import './index.less';
import ReactDOM from 'react-dom';
import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;

let Demo = React.createClass({
  handleSubmit(e) {
    e.preventDefault();
    console.log('收到表单值：', this.props.form.getFieldsValue());
  },

  render() {
    const { getFieldProps } = this.props.form;
	 const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
		<div style={{width:400,margin:"100px auto"}}>
      <Form horizontal onSubmit={this.handleSubmit}>
        <FormItem
			{...formItemLayout}
          label="账户"
        >
          <Input placeholder="请输入账户名"
            {...getFieldProps('userName')}
          />
        </FormItem>
        <FormItem
		{...formItemLayout}
          label="密码"
        >
          <Input type="password" placeholder="请输入密码"
            {...getFieldProps('password')}
          />
        </FormItem>
        <FormItem wrapperCol={{ span: 16, offset: 6 }} style={{ marginTop: 24 }}>
          <Checkbox {...getFieldProps('agreement')}>记住我</Checkbox>
        </FormItem>
		 <FormItem wrapperCol={{ span: 16, offset: 10 }} style={{ marginTop: 24 }}>
			<Button type="primary" htmlType="submit">登录</Button>
		</FormItem>
      </Form>
	  </div>
    );
  },
});

Demo = Form.create()(Demo);

ReactDOM.render(<Demo />, document.getElementById("root"));
