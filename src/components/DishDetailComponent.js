import React, { Component } from 'react';
import { Card, CardImg, CardText,CardBody,
    CardTitle } from 'reactstrap';


class DishDetail extends Component {

    renderComments(comments){
        if (comments==null){
            return(
                <div></div>        
            );
        }
        
        const cmnts = comments.map(comment => {
            return (
                <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>-- {comment.author},
                    {comment.date}
                    </p>
                </li>
            )
        })
        return(
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    {cmnts}
                </ul>
            </div>
        );

    }

    renderDish(dish){
        if (dish==null){
            return(<div></div>);
        }
        else{
            return(
                <div className="col-12 col-md-5 m-1">
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

    render(){
        const dish = this.props.dish
        if (dish ==null){
            return(
                <div></div>
            );
        }
        const dishitem = this.renderDish(dish)
        const dishcomments=this.renderComments(dish.comments)
        return(
            <div className="row">
              {dishitem}
              {dishcomments}
            </div>
        );

    }

}
export default DishDetail;