import React from 'react'
import Navbar from './Navbar'
import {Container} from 'react-bootstrap'
import AddFolderButton from './AddFolderButton'
import AddFileButton from './AddFileButton'
import{useFolder} from '../hooks/useFolder'
import Folder from './Folder'
import File from './File'
import {useParams, useLocation} from 'react-router-dom'
import FolderBreadCrumbs from './FolderBreadCrumbs'

const Dashboard = () => {
  const {folderId} = useParams()
  const {state = {}} = useLocation()
  const {folder , childFolders, childFiles} = useFolder(folderId,state.folder)
  
  return (
    <>
      <Navbar/>
      <Container fluid>
        <div className = "d-flex align-items-center">
          <FolderBreadCrumbs currentFolder = {folder} />
          <AddFileButton currentFolder = {folder} />
          <AddFolderButton currentFolder = {folder} />
        </div>
        {childFolders.length > 0 && (
          <div className = "d-flex flex-wrap">
            {childFolders.map(childfolder => (
              <div key = {childfolder.id} style = {{maxWidth:'250px'}} className = "p-2">
                <Folder folder = {childfolder}></Folder>
              </div>
            ))}
          </div>
        )}
        {childFolders.length > 0 && childFiles.length > 0 && <hr />}
        {childFiles.length > 0 && (
          <div className = "d-flex flex-wrap">
            {childFiles.map(childfile => (
              <div key = {childfile.id} style = {{maxWidth:'250px'}} className = "p-2">
                <File file = {childfile}></File>
              </div>
            ))}
          </div>
        )}
      </Container>
    </>
  )
}

export default Dashboard
