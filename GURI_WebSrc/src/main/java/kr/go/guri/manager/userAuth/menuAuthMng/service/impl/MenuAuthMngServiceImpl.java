package kr.go.guri.manager.userAuth.menuAuthMng.service.impl;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import kr.go.guri.manager.userAuth.menuAuthMng.service.MenuAuthMngService;
/**
 * 메뉴 권한 조회 serviceImpl 클래스
* @author 김부권
* @since 2022. 06. 22.
* @version 1.0
* @see
*
* <pre>
* << 개정이력(Modification Information) >>
*
*     수정일                         수정자                            수정내용
*  -----------       -------------   ----------------------
*  2022.06.22.           김부권                          최초 생성
*   
* </pre>
*/

@Service("menuAuthMngService")
public class MenuAuthMngServiceImpl implements MenuAuthMngService{
	
	@Resource( name = "menuAuthMngMapper")
	private MenuAuthMngMapper menuAuthMngMapper;

	@Override
	public List<Map<String, Object>> selectAuthList(Map<String, Object> param) throws SQLException , IOException {
		// TODO Auto-generated method stub
		return menuAuthMngMapper.selectAuthList(param);
	}
	
	@Override
	public List<Map<String, Object>> selectAuthMenuList(Map<String, Object> param) throws SQLException , IOException {
		// TODO Auto-generated method stub
		return menuAuthMngMapper.selectAuthMenuList(param);
	}
	
	@Override
	public List<Map<String, Object>> selectCheckMenuAuth(Map<String, Object> param) throws SQLException , IOException {
		// TODO Auto-generated method stub
		return menuAuthMngMapper.selectCheckMenuAuth(param);
	}

	@Override
	public int insertAuthMenuInfo(Map<String, Object> param) throws SQLException , IOException {
		// TODO Auto-generated method stub
		return menuAuthMngMapper.insertAuthMenuInfo(param);
	}

	@Override
	public int deleteAuthMenuInfo(Map<String, Object> param) throws SQLException , IOException {
		// TODO Auto-generated method stub
		return menuAuthMngMapper.deleteAuthMenuInfo(param);
	}

	
}
