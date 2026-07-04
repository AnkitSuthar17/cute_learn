import React, {useState} from 'react';
import "../styles/Buy.css";
import BuyAnim from './BuyAnim';
import { TextField, Button, Checkbox, FormControlLabel, Link, InputAdornment } from '@mui/material';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import { NavLink } from 'react-router-dom';

const Buy = () => {

  const [formValues, setFormValues] = useState({
    mobile: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formValues);
    // Add logic for handling form submission (e.g., sending data to backend)
  };
  return (
    <div className="buy-page">
      <div className="overlay-bg">
        <div className="login-wrapper">
          <div className="left-section">
            <BuyAnim/>
          </div>
          <div className="right-section">
           
            <div className='buy-text-content'>
            
          <TextField
            label="Mobile"
            type='tel'
            variant="outlined"
            fullWidth
            margin="normal"
            sx={{width: '80%', marginLeft: '35px', marginTop: '45px'}}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneIphoneIcon />
                </InputAdornment>
              ),
            }}
          />
     <NavLink to='/finalBuy'> <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{width: '50%', marginLeft: '90px'}}
        className="proceed-to-buy"
        onClick={handleSubmit}
      >
        Proceed to Buy
      </Button></NavLink>
       
            </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Buy;
