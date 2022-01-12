import { Footer } from './footer'
import { Navbar } from './navbar'

export function Layout(props: any) {
  return (
    <div className="dark-background-image pt-40">
      <Navbar />
      <section id="root" className="main-content-wrapper z-0 pt-80">
        {props.children}
      </section>
      <Footer />
    </div>
  )
}
