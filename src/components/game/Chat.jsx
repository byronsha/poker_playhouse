import React from 'react'

class Chat extends React.Component {
  render() {
    const messages = this.props.messages.map((message, index) => {
      return <li key={index}><b>{message.from}:</b>{message.body}</li>
    })

    return (
      <div className="chat">
        <h1>Chat</h1>
        <input
          type="text"
          placeholder="Enter a message..."
          onKeyUp={this.props.createMessage}
        />
        {messages}
      </div>
    )
  }
}

export default Chat
