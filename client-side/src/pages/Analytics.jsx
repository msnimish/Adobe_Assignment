import React from 'react'

const Analytics = () => {
    const [isAdmin,setIsAdmin] = useState(localStorage.getItem('adobe-isAdmin'));
  return (
    <div>Analytics</div>
  )
}

export default Analytics