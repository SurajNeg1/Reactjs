import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import AboutUs from './AboutUsComponent';
import DishDetail from './DishDetailComponent';
import Header from './HeaderComponent';
import Contact from './ContactComponent';
import Footer from './FooterComponent';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';
import { addComment, fetchDishes } from '../redux/ActionCreators';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      promotions: state.promotions,
      leaders: state.leaders
    }
  }
const mapDispatchToProps = dispatch => ({
  
    addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
    fetchDishes: () => { dispatch(fetchDishes())}
  });

  

class Main extends Component {
    
    componentDidMount() {
        this.props.fetchDishes();
      };

  constructor(props) {
    super(props);
    this.state = {
        dishes: DISHES,
        comments: COMMENTS,
        promotions: PROMOTIONS,
        leaders: LEADERS
    };
  }

  render() {
    
    const HomePage = () => {
        return(
            <Home 
                dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                dishesLoading={this.props.dishes.isLoading}
                dishesErrMess={this.props.dishes.errMess}
                promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
                leader={this.props.leaders.filter((leader) => leader.featured)[0]}
            />
        );
      }
      const DishWithId = ({match}) => {
        return(
            <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
              isLoading={this.props.dishes.isLoading}
              errMess={this.props.dishes.errMess}
              comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
              addComment={this.props.addComment}
            />
        );
      };
      return (
        <div>
          <Header />
          <div>
            <Switch>
                <Route path='/home' component={HomePage} />
                <Route exact path='/aboutus' component={() => <AboutUs leaders={this.props.leaders} />}  />
                <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
                <Route path='/menu/:dishId' component={DishWithId} />
                <Route exact path='/contactus' component={Contact}  />
                <Redirect to="/home" />
            </Switch>
          </div>
          <Footer />
        </div>
      );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));