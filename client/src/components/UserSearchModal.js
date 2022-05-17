import * as React from 'react'
import { connect } from 'react-redux'
import { css } from 'emotion'

import { searchUsers } from '../app/actions/searchUsers'

import Input from 'material-ui/Input';
import Modal from './Modal'
import Button from './Button'

const buttons = css`
  text-align: right;
`;
const inputStyle = {
  width: '100%',
  fontSize: '20px',
  fontFamily: 'Montserrat, sans-serif',
  marginBottom: '32px',
};

type Props = {
  open: boolean,
  header: string,
  closeModal: () => void,
  onSubmit: () => void,
  token: string,
  searchUsers: (token: string, query: string) => void,
  searchResults: Array<any>,
}
class UserSearchModal extends React.Component<Props, State> {
  handleSubmit = () => {
    const { searchResults, closeModal, token, searchUsers, onSubmit } = this.props
    searchUsers(token, '')
    onSubmit(searchResults)
    closeModal()
  }
  
  handleChange = (e: SyntheticEvent<HTMLInputElement>) => {
    e.preventDefault()
    const { token, searchUsers } = this.props
    searchUsers(token, e.target.value)
  }

  handleClose = () => {
    const { closeModal, token, searchUsers } = this.props
    searchUsers(token, '')
    closeModal()
  }

  render() {
    const { open, header, searchResults } = this.props;

    return (
      <Modal open={open}>
        <h2 className={css`margin-top: 0;`}>{header}</h2>
        <Input
          type="text"
          onChange={this.handleChange}
          style={inputStyle}
        />
        {searchResults.length > 0 && (
          <div className={css`margin-bottom: 20px;`}>
            {searchResults.map((result, idx) => <div key={idx}>{result.username}</div>)}
          </div>
        )}
        <div className={buttons}>
          <Button
            secondary
            onClick={this.handleClose}
            style={{ marginRight: '8px' }}
          >
            Cancel
          </Button>
          <Button onClick={this.handleSubmit}>
            Invite users
          </Button>
        </div>
      </Modal>
    )
  }
}

function mapStateToProps(state) {
  return {
    searchResults: state.searchUsers.searchResults,
    isFetching: state.searchUsers.isFetching,
    errorMessage: state.searchUsers.errorMessage,
    token: state.user.token,
  }
}

const mapDispatchToProps = ({
  searchUsers,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserSearchModal)