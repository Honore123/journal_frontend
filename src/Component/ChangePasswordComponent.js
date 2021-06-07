import React, { Component } from 'react';
import {Card,CardBody, CardTitle, CardSubtitle, Form, FormGroup, Label, Input, Button} from 'reactstrap'
class ChangePassword extends Component {
    render() {
        return (
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <Card className='shadow bg-white px-5 py-3 rounded border-0 rounded-0'>
                            <CardTitle tag='h4' className="text-center text-primary mt-4">
                                Reset Password
                            </CardTitle>
                            <CardSubtitle tag="h6" className="mb-4 pb-3 mt-1  text-center border-bottom border-primary"
                >
                  Fill out below form to reset your password
                </CardSubtitle>
                <CardBody>
                    <Form>
                        <FormGroup className="mb-3">
                            <Label>Current Password</Label>
                            <Input type='password'/>
                        </FormGroup>
                        <FormGroup className="mb-3" >
                            <Label>New Password</Label>
                            <Input type='password'/>
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <Label>Confirm Password</Label>
                            <Input type='password'/>
                        </FormGroup>
                        <Button color='primary' outline className="rounded-0 my-3 w-100">Update</Button>
                    </Form>
                </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}

export default ChangePassword;