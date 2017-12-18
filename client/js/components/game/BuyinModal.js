import React from 'react';
import Button from 'material-ui/Button';
import Dialog from 'material-ui/Dialog';
import Input from 'material-ui/Input';

const styles = {
  modal: {
    padding: '24px',
  },
  inputContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px',
  },
  buttons: {
    textAlign: 'right',
  },
  error: {
    color: 'red',
    marginTop: '24px',
    fontSize: '14px',
  }
}

class BuyinModal extends React.Component {
  state = {
    errorMessage: null,
  }

  handleClose = () => {
    this.setState({ errorMessage: null })
    this.props.closeModal();
  }

  handleBuyin = () => {
    const { tableId, seatId, table } = this.props
    const amount = parseFloat(this.buyinAmount.value)
    const minBuy = table.limit / 2
    const maxBuy = table.limit

    if (amount < minBuy || amount > maxBuy) {
      this.setState({ errorMessage: `Please enter an amount between ${minBuy} and ${maxBuy}` })
      return 
    };

    this.props.buyInAndSitDown(tableId, seatId, amount)
    this.props.closeModal()
    this.setState({ errorMessage: null })
  }

  render() {
    const { open, closeModal, table, seat } = this.props
    if (!table) return null
    const mustBuyIn = seat && seat.stack == 0

    return (
      <Dialog open={open || mustBuyIn}>
        <div style={styles.modal}>
          <h2 style={{ marginTop: '0' }}>How much will you buy in for?</h2>
          <div style={styles.inputContainer}>
            Buy in amount ($):
            <Input
              inputRef={ref => { this.buyinAmount = ref }}
              type="number"
              defaultValue={table.limit}
              style={{ width: '100px' }}
            />
          </div>

          <div style={styles.buttons}>
            {!mustBuyIn &&
              <Button
                raised
                dense
                onClick={() => this.handleClose()}
                style={{ marginRight: '8px' }}
              >
                Cancel
              </Button>
            }
            <Button
              raised
              dense
              color="primary"
              onClick={() => this.handleBuyin()}
            >
              Buy in
            </Button>
          </div>

          {this.state.errorMessage &&
            <div style={styles.error}>{this.state.errorMessage}</div>
          }
        </div>
      </Dialog>
    );
  }
}

export default BuyinModal