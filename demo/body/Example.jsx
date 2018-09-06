import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import styles from './example-styles';
import Source from './Source';
import Form from '../../src/Form';

class Example extends React.Component {
  state = {
    ...this.props.data, // eslint-disable-line react/destructuring-assignment
  }

  componentWillReceiveProps = ({ data }) => {
    this.setState({
      ...data,
    });
  }

  onChange = type => (value) => {
    this.setState({
      [type]: value,
    });
  }

  onFormChanged = ({ formData }) => {
    this.setState({ formData });
  }

  onSubmit = (value) => {
    console.log('onSubmit: %s', JSON.stringify(value)); // eslint-disable-line no-console
  }

  onCancel = () => {
    const { data } = this.props;
    this.setState({
      ...data,
    });
  }

  render() {
    const { data, classes } = this.props;
    const { title } = data;
    const { schema, uiSchema, formData } = this.state;
    return (
      <Paper className={classes.root}>
        <h3>{title}</h3>
        <div className={classes.ctr}>
          <div className={classes.sourceCtr}>
            <div>
              <Source title={'JSONSchema'} source={schema} onChange={this.onChange('schema')} />
            </div>
            <div>
              <Source title={'uiSchema'} source={uiSchema} onChange={this.onChange('uiSchema')} />
              <Source title={'formData'} source={formData} onChange={this.onChange('formData')} />
            </div>
          </div>
          <div className={classes.display}>
            <Form
              schema={schema}
              uiSchema={uiSchema}
              formData={formData}
              onCancel={this.onCancel}
              onSubmit={this.onSubmit}
              onChange={this.onFormChanged}
            />
          </div>
        </div>
      </Paper>
    );
  }
}
export default withStyles(styles)(Example);
