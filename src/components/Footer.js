import React, { Component } from 'react';
import { Icon, Segment } from 'semantic-ui-react';

export default class Footer extends Component {
    render() {
        return (
			<Segment.Group style={{"marginTop":"200px"}}>
                <Segment padded='very' textAlign='center'>         
                    <div style={{fontSize: '14px'}}>
                        <Icon color='red' name='copyright' size='large'/> 2018 Nguyen Thanh Phuc, BK University  
                    </div>
                    <div style={{fontSize: '14px'}}>
                        <a href='https://www.facebook.com/nguyen.thanhphuc.370' target='_blank' rel="noopener noreferrer"><Icon name='facebook square' size='large' link/></a>
                        <a href='https://github.com/' target='_blank' rel="noopener noreferrer"><Icon name='github' size='large' color = "black" link/></a>
                        <a href='https://www.linkedin.com/' target='_blank' rel="noopener noreferrer"><Icon name='linkedin' size='large' link/></a>
                    </div>
                </Segment>
            </Segment.Group>
        );
    }
}