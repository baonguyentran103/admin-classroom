import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@mui/material';
const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  city: 'Los Angeles',
  country: 'USA',
  jobTitle: 'Senior Developer',
  name: 'Katarina Smith',
  timezone: 'GTM-7'
};

import { getInitials } from '../../utils/get-initials';

import React from 'react';
import { useState, useEffect } from 'react';
export const AccountProfile = ({ info }) => {
  return (
    <Card {...info}>
      {info ? <>
        <CardContent>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* <Avatar
              src={user.avatar}
              sx={{
                height: 64,
                mb: 2,
                width: 64
              }}
            /> */}

            <Avatar
              src={info.Avatar}
              sx={{ mr: 2 }}
              // onClick={() => { openInPopup(admin) }}
              sx={{
                height: 64,
                mb: 2,
                width: 64
              }}
            >
              {getInitials(info.Fullname)}
            </Avatar>
            <Typography
              color="textPrimary"
              gutterBottom
              variant="h5"
            >
              {info.Fullname}
            </Typography>
          </Box>
        </CardContent>
        <Divider />
      </> : <></>}

    </Card>
  );
};


