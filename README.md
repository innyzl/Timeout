require timeOut;

<script type="text/javascript">
  // for loop
  $.timeOut(2000,()=>{
    console.log('Hello World');
    return true;
  });

  // one time
  $.timeOut(2000,()=>{
    console.log('Hello World');
    // or return false;
  });

  // one time
  $.timeOut('ID',2000,()=>{
    console.log('Hello World');
    // or return false;
  });

  $.doTimeout( 'ID', false );

</script>
