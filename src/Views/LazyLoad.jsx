import React from 'react';
import { LazyLoadImage }from 'react-lazy-load-image-component';
  import 'react-lazy-load-image-component/src/effects/blur.css';
function LazyLoad(props){
    
      return <LazyLoadImage
      
        {...props}
        
         
        effect="blur" />
};
export default LazyLoad;