import {Button,Modal,Form} from 'react-bootstrap'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faFolderPlus} from "@fortawesome/free-solid-svg-icons"
import { useState } from 'react'
import {database} from '../../firebase'
import {useAuth} from '../../contexts/AuthContext'
import {ROOT_FOLDER} from '../hooks/useFolder'

const AddFolderButton = ({currentFolder}) => {
  const [open,setOpen] = useState(false)
  const[name,setName] = useState("")
  const {currentUser} = useAuth()
  function openModal() {
    setOpen(true)
  }
  function closeModal(){
    setOpen(false)
  }
  function handleSumbit(e){
    e.preventDefault()
    
    if(currentFolder == null) return

    const path = [...currentFolder.path]
    if(currentFolder !== ROOT_FOLDER){
      path.push({name: currentFolder.name, id: currentFolder.id})
    }

    database.folders.add({
      name:name,
      parentId: currentFolder.id,
      userId:currentUser.uid,
      path: path,
      createdAt:database.getCurrentTimeStamp()
    })
    setName("")
    closeModal()
  }

  return (
    <>
      <Button onClick = {openModal} variant = "outline-success" size= "sm">
        <FontAwesomeIcon icon = {faFolderPlus}></FontAwesomeIcon>
      </Button>
      <Modal show = {open} onHide = {closeModal}>
        <Form onSubmit = {handleSumbit}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Folder Name</Form.Label>
              <Form.Control 
              type = "text"
              required
              value = {name}
              onChange = {e => setName(e.target.value)}/>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant = "secondary" onClick = {closeModal}>Close</Button>
            <Button variant = "sucess" type = "submit">Add folder</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}

export default AddFolderButton
