import { Footer } from './footer'
import { Navbar } from './navbar'
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { ThemeType } from '../../core/data/base';

export function Layout(props: any) {
  const [backgroundColor, setBackgroundColor] = useState('dark-background-image');

  const themeStatus = useSelector((state)  => state.ThemeStatus);

  useEffect(() => {
    setBackgroundColor(themeStatus === ThemeType.DarkMode ? 'dark-background-image' : 'light-background-image');
  }, [themeStatus]);
  return (
    <div className={"pt-40 transition duration-500 " + backgroundColor}>
      <Navbar />
      <section id="root" className="main-content-wrapper z-0 pt-80">
        {props.children}
      </section>
      <Footer />
    </div>
  )
}
