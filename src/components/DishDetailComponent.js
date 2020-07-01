import React, { Component } from 'react';
import { Card, CardImg, CardText,CardBody,
    CardTitle, BreadcrumbItem, Breadcrumb , Button,Label, Row, Col, Modal, ModalBody, ModalHeader} from 'reactstrap';
import { Link } from 'react-router-dom';
import {Control , LocalForm, Errors} from 'react-redux-form';
import { Loading } from './LoadingComponent';

    function RenderComments({comments,addComment, dishId}){
        if (comments==null){
            return(
                <div></div>        
            );
        }
        
        const cmnts = comments.map(comment => {
            return (
                <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>-- {comment.author},{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                </li>
            );
        });
        return(
            <div className="col-12 col-md m-1">
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    {cmnts}
                </ul>
                <CommentForm dishId={dishId} addComment={addComment} />
            </div>
        );

    }

    function RenderDish({dish}){
        if (dish==null){
            return(<div></div>);
        }
        else{
            return(
                <div className="col-12 col-md m-1">
                    <Card key={dish.id} >
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
            );
        }
    }

    const DishDetail = (props)=>{
        if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        if (props.dish ==null){
            return(
                <div></div>
            );
        }
        else
            return(
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem ><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                    </div>
                    <div className="row">
                        <h3>{props.dish.name}</h3>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md m-1">
                            <RenderDish dish={props.dish} />
                        </div>
                        <div className="col-12 col-md m-1">
                            <RenderComments comments={props.comments}
                                dishId={props.dish.id} 
                                addComment={props.addComment}/>
                        </div>
                    </div>
                </div>
            );

    }
    const required =(val)=> val && val.length;
    const maxLength = (len) => (val) => !(val) || (val.length <= len);
    const minLength = (len) => (val) => val && (val.length >= len);
    class CommentForm extends Component{
        constructor(props){
            super(props);
            this.state={
                isModalOpen:false
            };
            this.handleSubmit=this.handleSubmit.bind(this);
            this.toggleModal =this.toggleModal.bind(this);
        }
        toggleModal() {
            this.setState({
              isModalOpen: !this.state.isModalOpen
            });
        }
        handleSubmit(values){
            this.toggleModal();
            this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
        }
        render(){
            return(
                <React.Fragment>
                    <Button outline onClick={this.toggleModal}>
                            <span className="fa fa-pencil fa-lg"></span> Submit Comment
                    </Button>
                    <div className="col-12 col-md-9">
                        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} >
                            <ModalHeader toggle={this.toggleModal}>Submit Comments</ModalHeader>
                                <ModalBody>
                                    <LocalForm onSubmit= {(values)=>this.handleSubmit(values)}>
                                        <Row className="form-group">
                                        <Label htmlFor="rating" md={12}>Rating</Label>
                                            <Col md={12}>
                                                <Control.select model=".rating" name="rating" 
                                                            className="form-control">
                                                        <option>1</option>
                                                        <option>2</option>
                                                        <option>3</option>
                                                        <option>4</option>
                                                        <option>5</option>
                                                </Control.select>
                                            </Col>
                                        </Row>
                                        <Row className="form-group">
                                            <Label htmlFor="author" md={12}>Your Name</Label>
                                                <Col md={12}>
                                                    <Control.text model=".author" id="author" name="author" placeholder="Your Name"
                                                                className="form-control" 
                                                                validators={{
                                                                    required, minLength: minLength(3), maxLength: maxLength(15)
                                                                }}
                                                    />
                                                    <Errors className="text-danger" model=".author" show="touched"
                                                    messages={{
                                                        required: 'Required',
                                                        minLength: 'Must be greater than 2 characters',
                                                        maxLength: 'Must be 15 characters or less'
                                                    }}
                                                    />
                                                </Col>
                                        </Row>
                                        <Row className="form-group">
                                            <Label htmlFor="comment" md={12}>Comments</Label>
                                            <Col md={12}>
                                                <Control.textarea model=".comment" id="comment" name="comment" row="20"
                                                            className="form-control"/>
                                            </Col>
                                        </Row>
                                        <Row className="form-group">
                                            <Col md={{size:10,offset:2}}>
                                                <Button type="submit" color="primary" >
                                                    <strong>Submit</strong>
                                                </Button>
                                            </Col>
                                        </Row>
                                    </LocalForm>
                                </ModalBody>
                        </Modal>
                    </div>
                </React.Fragment>
            );
        }
    };


export default DishDetail;