package handler

import (
    "net/http"
    "github.com/labstack/echo"

)


func (h* Handler) HandleData(c echo.Context) (err error) {
	// TODO: 数据处理逻辑

	return c.String(http.StatusOK, "Hello, World!")
}