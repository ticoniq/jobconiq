import Footer from '@/components/Footer'
import { NavBar } from '@/components/NavBar'
import { JobsList } from '@/components/frontend/Jobs'


function JobsPage() {
  return (
    <>
      <NavBar />
      <section className="container">
        <JobsList />
      </section>
      <Footer />
    </>
  )
}

export default JobsPage