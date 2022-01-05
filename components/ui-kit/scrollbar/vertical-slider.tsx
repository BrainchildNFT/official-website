import Slider, { SliderThumb } from '@mui/material/Slider';

export default function VerticalSlider(props: any) {
  const ThumbComponent = ({children, ...other}) => {
    return (
      <SliderThumb {...other}>
        {children}
        <div className="h-10 w-5 rounded-md" style={{color: 'transparent', background:'linear-gradient(90.86deg, #FFC6CE 26.22%, #64D6EE 97.07%)'}}>a</div>
      </SliderThumb>
    );
  };

  return (<>
    <Slider aria-label="pretto slider" components={{ Thumb: ThumbComponent } } {...props}/>
  </>);
}
