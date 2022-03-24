# Point-Service

A TypeScript-based service to store the mapped points by the drone while flying it.

## Description

This service was created in order to have a more flexible way of storing the 3D coordinates obtained from the drone and to be able to process them after the mapping process has finished. It has the functionality of adding points, which will always be associated to a certain mapping session, and be stored in a MongoDB database. This way, the service offers the functionality of updating an old session with new points. The session route will be needed to get access to a specific session. The service uses most notably Express which is a NodeJS web application framework and Mongoose which is an object data modelling library for MongoDB.

## Getting Started

## Authors

The Dronerz Team  
Dennis Trollsfjord, dentro-8@student.ltu.se  
Antonio Saldaña, anosal-1@student.ltu.se  
Hugo Pettersson, hugpet-8@student.ltu.se  
Erik Sörensen, erisre-8@student.ltu.se  
Johan Olsson, ojaolo-8@student.ltu.se  
