import './index.html';
import './index.less';
import ReactDOM from 'react-dom';
import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;


let Demo = React.createClass({
  handleSubmit(e) {
    e.preventDefault();
	 this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        console.log('Errors in form!!!');
        return;
      }
	  console.log('收到表单值：', this.props.form.getFieldsValue());
      console.log('Submit!!!');
      console.log(values);
    });
  },
	
  checkPass(rule, value, callback) {
    const { validateFields } = this.props.form;
    if (value) {
      validateFields(['passwd'], { force: true });
    }
    callback();
  },
  
  checkName(rule, value, callback) {
    const {getFieldValue} = this.props.form;
	if (value === '') {
          callback([new Error('请输入用户名')]);
	}
    if (value) {
      validateFields(['name'], { force: true });
    }
    callback();
  },
  
  
  render() {
     const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
	 const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
	const passwdProps = getFieldProps('passwd', {
      rules: [
        { required: true, whitespace: true, message: '请填写密码' },
        { validator: this.checkPass },
      ],
    });
	 const nameProps = getFieldProps('name', {
      rules: [
        { required: true,whitespace: true, message: '请填写用户名' },
        { validator: this.checkName },
      ],
    });
    return (
		<div style={{width:400,margin:"100px auto"}}>
      <Form horizontal onSubmit={this.handleSubmit}>
        <FormItem
			{...formItemLayout}
          label="账户"
		  hasFeedback
		    help={isFieldValidating('name') ? '校验中...' : (getFieldError('name') || []).join(', ')}
        >
          <Input placeholder="请输入账户名"
            {...nameProps}
			
          />
        </FormItem>
        <FormItem
		{...formItemLayout}
          label="密码"
		   hasFeedback
        >
          <Input type="password" placeholder="请输入密码" 
            {...passwdProps}
          />
        </FormItem>
        <FormItem wrapperCol={{ span: 16, offset: 6 }} style={{ marginTop: 24 }}>
          <Checkbox {...getFieldProps('agreement')}>记住我</Checkbox>
        </FormItem>
		 <FormItem wrapperCol={{ span: 16, offset: 10 }} style={{ marginTop: 24 }}>
			<Button type="primary"  htmlType="submit">登录</Button>
		</FormItem>
      </Form>
	  </div>
    );
  },
});

Demo = Form.create()(Demo);

ReactDOM.render(<Demo />, document.getElementById("root"));
