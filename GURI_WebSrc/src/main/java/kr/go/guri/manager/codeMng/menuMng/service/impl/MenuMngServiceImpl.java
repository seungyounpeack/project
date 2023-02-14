package kr.go.guri.manager.codeMng.menuMng.service.impl;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import kr.go.guri.manager.codeMng.menuMng.service.MenuMngService;

/**
 * 관리자 > 메뉴 관리 ServiceImpl 클래스
 * @author 김부권
 * @since 2022. 06. 17.
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *       수정일			     수정자		               수정내용
 *  --------------    -------------   ----------------------
 *  2022. 06. 17.   	     김부권                        최초 생성
 *   
 * </pre>
 */

@Service("menuMngService")
public class MenuMngServiceImpl implements MenuMngService {

	@Resource(name = "menuMngMapper")
	private MenuMngMapper menuMngMapper;
	
	@Override
	public List<Map<String, Object>> selectMenuList() throws SQLException , IOException{
		// TODO Auto-generated method stub
		return menuMngMapper.selectMenuList();
	}
	
	@Override
	public List<Map<String, Object>> selectMenuNext(Map<String, Object> param) throws SQLException , IOException{
		// TODO Auto-generated method stub
		return menuMngMapper.selectMenuNext(param);
	}
	
	@Override
	public List<Map<String, Object>> selectAuthMenuList(Map<String, Object> param) throws SQLException , IOException{
		// TODO Auto-generated method stub
		return menuMngMapper.selectAuthMenuList(param);
	}
	
	@Override
	public Map<String, Object> selectMenuDp(Map<String, Object> param) throws SQLException , IOException{
		// TODO Auto-generated method stub
		return menuMngMapper.selectMenuDp(param);
	}

	@Override
	public int insertTopMenuInfo(Map<String, Object> param) throws SQLException, IOException {
		// TODO Auto-generated method stub
		return menuMngMapper.insertTopMenuInfo(param);
	}

	@Override
	public int insertSubMenuInfo(Map<String, Object> param) throws SQLException, IOException {
		// TODO Auto-generated method stub
		return menuMngMapper.insertSubMenuInfo(param);
	}

	@Override
	public int updateTopMenuInfo(Map<String, Object> param) throws SQLException, IOException {
		// TODO Auto-generated method stub
		return menuMngMapper.updateTopMenuInfo(param);
	}

	@Override
	public int updateSubMenuInfo(Map<String, Object> param) throws SQLException, IOException {
		// TODO Auto-generated method stub
		return menuMngMapper.updateSubMenuInfo(param);
	}

	@Override
	public int deleteTopMenuInfo(Map<String, Object> param) throws SQLException, IOException {
		// TODO Auto-generated method stub
		return menuMngMapper.deleteTopMenuInfo(param);
	}

	@Override
	public int deleteSubMenuInfo(Map<String, Object> param) throws SQLException, IOException {
		// TODO Auto-generated method stub
		return menuMngMapper.deleteSubMenuInfo(param);
	}

}
