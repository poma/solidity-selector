# Solidity selector

Calculates solidity selector from function signature

# Installation

```
npm i -g solidity-selector
```

# Usage

```shell script
> solidity-selector 'f(uint n)'
0xb3de648b f(uint256)
```

```shell script
> solidity-selector 'function f(uint256 q, bytes[] memory zz)'
0xd9a8bd39 f(uint256,bytes[])
```

```shell script
> echo '
    struct Foo { address target; }
    function f(uint256 q, bytes[] memory zz, Foo memory qwe)
' | solidity-selector
0xf6b2d3d1 f(uint256,bytes[],(address))
```

```shell script
> solidity-selector input.sol
0xf6b2d3d1 f(uint256,bytes[],(address))
```
