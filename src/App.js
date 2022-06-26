import Navbar from './Navbar';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Create from './Create';
import BlogDetails from './BlogDetails';
import NotFound from './NotFound';

function App(props) {
  return (
    <Router>
        <div className="App">
      <Navbar />
        <div className='content'>
          <Switch>
            <Route exact path="/">
              <Home onAddBlog={onAddBlog}/>
            </Route>
            <Route path="/create">
              <Create />
            </Route>
            <Route path="/blogdetails/:id">
              <BlogDetails/>
            </Route>
            <Route path="*">
              <NotFound/>
            </Route>
          </Switch>
        </div>
        </div>
    </Router> 
  );
}

export default App;
