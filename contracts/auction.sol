pragma solidity 0.8.9;
contract auction{
    string [100]public nfthash;
    address [100]public nftowner;
    uint256 public index;
    address public host;
    string sea;
    bool public doing = false;
    bool public claim = true;
    string public sellhash;
    address public sellowner;
    uint256 public minbid;
    uint256 public maxbid;
    address public bider;
    uint256 public auctionend;

    mapping (string => bool) public id;
    mapping (string => address) public own;
    mapping (string => uint256) public ind;
    mapping (string => uint256) public ownnum;
    mapping (string => address[100]) path;
    constructor() public {
        index = 0;
        host = msg.sender;
    }
    function make(string memory h) public returns (bool){
        if(id[h])return false;
        id[h]=true;
        index++;
        nftowner[index] = msg.sender;
        nfthash[index] = h;
        own[h]=msg.sender;
        ind[h]=index;
        ownnum[h] = 1;
        path[h][0] = msg.sender;
        return true;
    }
    function search(string memory h) public {
        sea = h;
    }
    function getownnum() public view returns(uint256) {
        return ownnum[sea];
    }
    function getpath() public view returns(address [100] memory)
    {
        return path[sea];
    }
    function test() public view returns (uint256){
        return index;
    }
    function getnfthash() public view returns(string [100] memory)
    {
        return nfthash;
    }
    function getnftowner() public view returns(address [100] memory)
    {
        return nftowner;
    }
    function getsellhash() public view returns(string memory)
    {
        return sellhash;
    }
    function getdoing() public view returns(bool)
    {
        return doing;
    }
    function getprice() public view returns(uint256)
    {
        if(minbid>maxbid)return minbid;
        else
        return maxbid;
    }
    function startauction(uint256 num,string memory ha,uint256 time) public
    {
        require(doing==false);
        require(claim==true);
        require(own[ha]==msg.sender);
        doing = true;
        sellhash = ha;
        sellowner = msg.sender;
        auctionend = time + block.timestamp;
        minbid = num;
    }
    function gettime() public view returns(uint256){
        if(auctionend>block.timestamp)
        return auctionend - block.timestamp;
        else
        return 0;
    }
    function when() public payable {
        if(doing)
        {
            if(block.timestamp>=auctionend)
            {
                doing = false;
                if(maxbid>0)
                {
                    claim = false;
                    payable(sellowner).transfer(maxbid);
                }
                
            }
        }
    }
    function addbid() public payable{
        require(block.timestamp<auctionend);
        require(msg.value>maxbid);
        if(maxbid>0)
        {
            address payable add = payable(bider);
            add.transfer(maxbid);
        }
        bider = msg.sender;
        maxbid = msg.value;

    }
    function doclaim () public{
        require(block.timestamp>=auctionend);
        require(bider==msg.sender);
        require(doing==false);
        require(claim==false);
        claim = true;
        own[sellhash] = msg.sender;
        path[sellhash][ownnum[sellhash]] = msg.sender;
        ownnum[sellhash]++;
        nftowner[ind[sellhash]] = msg.sender;
        maxbid = 0;

    }
}
