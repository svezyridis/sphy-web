import React, { useEffect, useState } from 'react'
import { fetch } from 'whatwg-fetch'
import Typography from '@material-ui/core/Typography'

const Announcments = () => {
  const [text, setText] = useState('')
  useEffect(() => {
    initialize()
  }, [])
  const initialize = () => {
    fetch('http://quotes.rest/qod.json?category=inspire')
      .then(response => {
        if (response.ok) { return response.json() } else throw Error(`Request rejected with status ${response.status}`)
      })
      .then(data => {
        const { success, contents } = data
        if (success) setText(contents.quotes[0].quote)
      })
      .catch(error => console.error(error))
  }
  return <Typography align='center'>{text}</Typography>
}

export default Announcments
