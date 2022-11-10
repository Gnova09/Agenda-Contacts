import React from 'react'
import styled from 'styled-components'
import Table from './Table'

const Divhome= styled.div`
display: flex;
height: calc(100% - 61px);
`
const Principal = () => {
  return (
    <Divhome>
        <Table/>
    </Divhome>
  )
}

export default Principal