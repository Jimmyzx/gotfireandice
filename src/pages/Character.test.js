    // Displays the character's father's name if available.
    it('should display the character\'s father\'s name when available', () => {
        // Mock axios.get to return a successful response with father's name
        jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: { name: 'Eddard Stark' } });
  
        // Render the Character component with father data
        const wrapper = shallow(<Character />);
        wrapper.setState({ character: { father: 'https://anapioficeandfire.com/api/characters/1' } });
  
        // Assert that the father's name is displayed correctly
        expect(wrapper.find('p').at(3).text()).toEqual('Father: Eddard Stark');
      });