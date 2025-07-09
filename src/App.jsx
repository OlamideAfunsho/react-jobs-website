import React from 'react'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom'
import HomePage from './pages/HomePage'
import MainLayout from './layouts/MainLayout'
import JobsPage from './pages/JobsPage'
import NotFoundPage from './pages/NotFoundPage'
import JobPage, {jobLoader} from './pages/JobPage'
import AddJobPage from './pages/AddJobPage'
import EditJobPage from './pages/EditJobPage'


// This adds a new job
const addJob = async (newJob) => {
  const res = await fetch('https://json-api-server-h4pp.onrender.com/jobs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newJob),
  });
  return;
}

// This deletes a job
const deleteJob = async(id) => {
  const res = await fetch(`https://json-api-server-h4pp.onrender.com/jobs/${id}`, {
    method: 'DELETE',
  });
  return;
}

// Update Job
const updateJob = async (job) => {
  const res = await fetch(`/api/jobs/${job.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(job),
  });
  return;
}

const router = createBrowserRouter(
  createRoutesFromElements(
  <Route path='/' element = {<MainLayout />}>
    <Route index element = {<HomePage />} />
    <Route path='/jobs' element = {<JobsPage />} />
    <Route path='*' element = {<NotFoundPage />} />
    <Route path='/jobs/:id' element = {<JobPage deleteJob={deleteJob} />} loader = {jobLoader} />
    <Route path='/add-job' element = {< AddJobPage addJobSubmit={addJob} />} />
    <Route path='/edit-job/:id' element = {< EditJobPage updateJobSubmit={updateJob} />} loader={jobLoader} />
  </Route>

))

const App = () => {
  
  return (
    <RouterProvider router = {router} />
    
  )
}

export default App