import Header from "../components/Header"
import Footer from "../components/Footer"

const entryLayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}

export default entryLayout
