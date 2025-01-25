export const mockedConfigAPI = new Promise(resolve =>
  setTimeout(() => {
    import('../config/sportsConfig').then(({ SPORTS_CONFIG }) => {
      resolve(SPORTS_CONFIG);
    });
  }, 500)
)
export const mockedPlayerAPI = new Promise(resolve =>
  setTimeout(() => {
    resolve({
      NFL: {
        'QB': [
          { id: '1', name: 'Tom Brady', number: '12', position: 'QB' },
          { id: '2', name: 'Aaron Rodgers', number: '12', position: 'QB' }
        ],
        'RB': [
          { id: '3', name: 'Derrick Henry', number: '22', position: 'RB' }
        ],
        'WR': [
          { id: '7', name: 'DeAndre Hopkins', number: '10', position: 'WR' },
          { id: '8', name: 'Julio Jones', number: '11', position: 'WR' }
        ],
        'TE': [
          { id: '9', name: 'Travis Kelce', number: '87', position: 'TE' }
        ]
      },
      Soccer: {
        'SS': [
          { id: '4', name: 'Lionel Messi', number: '10', position: 'SS' },
          { id: '5', name: 'Cristiano Ronaldo', number: '7', position: 'SS' }
        ],
        'GK': [
          { id: '6', name: 'Manuel Neuer', number: '1', position: 'GK' }
        ],
        'CAM': [
          { id: '10', name: 'Luka Modric', number: '10', position: 'CAM' },
          { id: '11', name: 'Kevin De Bruyne', number: '17', position: 'CAM' }
        ],
        'LB': [
          { id: '12', name: 'Virgil van Dijk', number: '4', position: 'LB' }
        ]
      }
    });
  }, 1000)
)