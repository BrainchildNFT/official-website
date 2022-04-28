import { Footer } from './footer';
import { Navbar } from './navbar';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { ThemeType } from '../../core/data/base';

export function Layout(props: any) {
  const [backgroundColor, setBackgroundColor] = useState(
    'dark-background-image'
  );

  const themeStatus = useSelector((state: any) => state.ThemeStatus);

  useEffect(() => {
    setBackgroundColor(
      themeStatus === ThemeType.DarkMode
        ? 'dark-background-image'
        : 'light-background-image'
    );
  }, [themeStatus]);

  return (
    <div
      className={'transition duration-500 overflow-x-clip ' + backgroundColor}
      role="img"
      aria-label="Gradient background Image"
    >
      <Navbar/>
      <section id="root" className="main-content-wrapper z-0 pt-80">
        {props.children}
      </section>
      <Footer/>
    </div>
  );
}
