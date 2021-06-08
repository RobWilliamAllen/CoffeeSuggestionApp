
import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
 
    this.state = {
      coffeeType: '',
      numberOfCups: 1,
      origin: '',
      flavour: 6, 
      displaySlide1: true,
      displaySlide2: false,    
    };      
    
     this.setCoffeeTypeFilter = this.setCoffeeTypeFilter.bind(this);
     this.setCoffeeTypeEspresso = this.setCoffeeTypeEspresso.bind(this);
     this.setNumberOfCups = this.setNumberOfCups.bind(this);    
     this.setflavour = this.setflavour.bind(this);  
     this.toggleDisplayedSlide = this.toggleDisplayedSlide.bind(this);  
     this.resetDisplayedSlide = this.resetDisplayedSlide.bind(this);
  }

  onClick() {
      this.setState( {
      coffeeType: 'Filter Coffee'
    });
  };
  
  setCoffeeTypeFilter() {
    this.setState( {
      coffeeType: 'Filter Coffee'
    });
  };
  
  setCoffeeTypeEspresso() {
    this.setState( {
      coffeeType: 'Espresso Coffee'
    });
  };
  
  setNumberOfCups(event) {
    this.setState( {
       numberOfCups: event.target.value       
    });
  }; 
 
  setflavour(event) {
     this.setState( {
       flavour: event.target.value    
    });
  };  
  
  toggleDisplayedSlide() {
     this.setState( {
       displaySlide1: false,
       displaySlide2: true,
    }); 
  };  
    
  resetDisplayedSlide() {
     this.setState( {
       displaySlide1: true,
       displaySlide2: false,
    }); 
  };  
  
  
  render() {
    
   let displayToggle1 = this.state.displaySlide1 ? "outerContainer" : "hideElement";  
   let displayToggle2 = this.state.displaySlide2 ? "outerContainer" : "hideElement";
                                                    
    return (
     <div>
        <div className={displayToggle1}>          
          <div className="innerContainer boldText">
            <div className="textContent">
              <div className="question boldText"> 
                <p>Fill out the form to get some coffee suggestions</p>
              </div>
              <div className="question"> 
                <NumberOfCups onChange={this.setNumberOfCups} />
              </div>
              <div className="buttonDiv"> 
                <p>What type of coffee are you making?</p>            
                <FilterButton onClick={this.setCoffeeTypeFilter}  /> 
                <EspressoButton onClick={this.setCoffeeTypeEspresso} />                 
              </div>             
              <div className="question">               
                  <FlavourSlider  onChange={this.setflavour} />       
              </div>
              <div className="nextButton question">
                <NextButton onClick={this.toggleDisplayedSlide}/>
              </div>              
            </div>           
         </div>
        </div>
           <div className={displayToggle2}>  
            <div className="innerContainer">
               <div className="textContent">
                  <UserSelections origin={this.state.origin} 
                                  setOrigin={this.setOrigin} 
                                  numberOfCups={this.state.numberOfCups}      
                                  coffeeType={this.state.coffeeType}                                  
                                  flavour={this.state.flavour} 
                                  resetDisplayedSlide={this.resetDisplayedSlide} />
              </div>
            </div>              
         </div>        
   </div>
    );
  } 
} 

class UserSelections extends React.Component {
  
  render() {  
    
    return (   
      <div className="boldText">
        <h2>Here are your coffee reccomendations:</h2>      
        {
          this.props.coffeeType === "Filter Coffee" ? 
          <div className="question"> 
              <p>Grind size: Coarse <span className="resetFontStyle">because you're making {this.props.coffeeType}</span></p>
            </div>
           :
            <div className="question"> 
              <p>Grind size: Fine <span className="resetFontStyle">because you're making {this.props.coffeeType}</span></p>    
            </div>
      }
       <div className="question"> 
           <p>Use {Math.round(this.props.numberOfCups * 8.3)} grams of coffee for <span className="resetFontStyle">{this.props.numberOfCups} cups.</span></p>           
        </div>
        {
           this.props.flavour < 5  ? 
          <div className="question"> 
               <p>Try coffee from Africa,<span className="resetFontStyle"> which is known for its bright, citrusy flavours. Choose a light roost to retain the beans' naturally fruity flavour.</span></p> 
          </div>
         : this.props.flavour > 9 ?
          <div className="question"> 
               <p>Try coffee from Asia,<span className="resetFontStyle"> which is known for its full bodied, earthy flavours. Choose a dark roost for a smokey, nutty flavour</span></p> 
          </div>
         :  
          <div className="question"> 
             <p>Try coffee from Central & South America,<span className="resetFontStyle"> which is known for its medium balanced flavours. Choose a medium roost for a balance of body & flavour</span></p>
          </div>
      }
        <div className="nextButton question">
          <input type="button" value="Start Over" onClick={this.props.resetDisplayedSlide} />       
        </div>
      </div>  
    );
  } 
} 


const FilterButton = ({ onClick }) => (  
    <button onClick={onClick} type="button">Filter Coffee</button>  
);

const EspressoButton = ({ onClick }) => (
  <button onClick={onClick} type="button">Espresso Coffee</button>     
);

const NumberOfCups  = ({ onChange }) => (  
  <form>        
     <label>
      How many cups are you making? 
      <input type="number" min="1" max="12" defaultValue="1" onChange={onChange} />       
     </label>            
  </form> 
);

const FlavourSlider = ({ onChange }) => (
 <div>
    <p>What taste do you prefer in your coffee?</p>
    <p className="smallText resetFontStyle">Fruity, bright, citrusy
          <input  onChange={onChange} type="range" id="Flavour" name="Flavour"
                 min="1" max="12" label="Flavour" defaultValue="6" />
             Earthy, full bodied, chocolatey</p>
    </div>
);

const NextButton = ({ onClick }) => (  
    <button onClick={onClick} type="button">Next</button>  
);  

ReactDOM.render(
  <App />,
  document.getElementById('root')
);


export default App;
